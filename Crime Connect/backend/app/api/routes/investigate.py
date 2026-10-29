from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os
import io
from app.api.deps import get_current_user
from app.services.neo4j_service import Neo4jService
from app.services.llm_service import get_llm_service

from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

router = APIRouter(prefix="/api/investigate", tags=["investigation"])

class InvestigateResponse(BaseModel):
    report: str

def query_neo4j(case_id: str):
    nodes = Neo4jService.get_all_nodes()
    # Filter for case
    case_nodes = [n for n in nodes if n.get("properties", {}).get("case_id") == case_id]
    
    # We could also get relationships, but let's just group by label for simplicity
    summary = {"suspects": [], "locations": [], "weapons": []}
    for n in case_nodes:
        props = n.get("properties", {})
        if n["label"] == "Suspect":
            summary["suspects"].append(props.get("name", "Unknown"))
        elif n["label"] == "Location":
            summary["locations"].append(props.get("name", "Unknown"))
        elif n["label"] == "Weapon":
            summary["weapons"].append(props.get("name", "Unknown"))
    
    return summary

def generate_pdf(case_id: str, report_text: str, data: dict):
    os.makedirs("./reports", exist_ok=True)
    file_path = f"./reports/Investigation_Report_{case_id}.pdf"
    
    doc = SimpleDocTemplate(file_path, pagesize=letter)
    styles = getSampleStyleSheet()
    Story = []
    
    Story.append(Paragraph(f"Investigation Report for {case_id}", styles['Title']))
    Story.append(Spacer(1, 12))
    
    Story.append(Paragraph("Extracted Suspects:", styles['Heading2']))
    for s in data["suspects"]:
        Story.append(Paragraph(f"- {s}", styles['Normal']))
    
    Story.append(Spacer(1, 12))
    Story.append(Paragraph("Extracted Locations:", styles['Heading2']))
    for l in data["locations"]:
        Story.append(Paragraph(f"- {l}", styles['Normal']))
        
    Story.append(Spacer(1, 12))
    Story.append(Paragraph("AI Reasoning & Conclusion:", styles['Heading2']))
    # report_text could have newlines
    for p in report_text.split("\n"):
        if p.strip():
            Story.append(Paragraph(p, styles['Normal']))
            Story.append(Spacer(1, 6))
            
    doc.build(Story)
    return file_path

@router.post("/{case_id}", response_model=InvestigateResponse)
async def investigate(case_id: str, current_user: dict = Depends(get_current_user)):
    data = query_neo4j(case_id)
    if not data["suspects"] and not data["locations"]:
        raise HTTPException(status_code=404, detail="No graph data found for this case id")
    
    prompt = f"Analyze this crime case data. Give a brief logical conclusion. Data: {data}"
    
    # Run LLM (Using LLMService with Groq)
    llm = get_llm_service()
    try:
        result = await llm.run_prompt(prompt)
    except Exception as e:
        result = f"LLM error: {str(e)}"
        
    return {"report": result}


@router.get("/{case_id}/pdf")
async def download_pdf(case_id: str, current_user: dict = Depends(get_current_user)):
    data = query_neo4j(case_id)
    prompt = f"Analyze this crime case data. Give a brief logical conclusion. Data: {data}"
    
    llm = get_llm_service()
    try:
        result = await llm.run_prompt(prompt)
    except Exception as e:
        result = f"LLM error: {str(e)}"
        
    pdf_path = generate_pdf(case_id, result, data)
    return FileResponse(path=pdf_path, filename=f"Report_{case_id}.pdf", media_type="application/pdf")
