"""
Neo4j database connection and session management.
Handles driver initialization, session lifecycle, and error handling.
"""

import logging
from typing import Optional
from neo4j import GraphDatabase, Session, Driver
from app.core.config import settings

logger = logging.getLogger(__name__)

# Global driver instance
_driver: Optional[Driver] = None


def init_driver() -> Driver:
    """
    Initialize and return the Neo4j driver.
    Called once at application startup.
    """
    global _driver

    if _driver is not None:
        return _driver

    try:
        _driver = GraphDatabase.driver(
            settings.neo4j_uri,
            auth=(settings.neo4j_username, settings.neo4j_password),
        )

        # Verify connection
        _driver.verify_connectivity()

        logger.info(f"Neo4j connected: {settings.neo4j_uri}")
        return _driver

    except Exception as e:
        logger.error(f"Failed to initialize Neo4j driver: {str(e)}")
        raise


def get_driver() -> Driver:
    """Get the global driver instance."""
    if _driver is None:
        raise RuntimeError("Neo4j driver not initialized. Call init_driver() first.")
    return _driver


def close_driver() -> None:
    """
    Close the Neo4j driver.
    Called during application shutdown.
    """
    global _driver

    if _driver is not None:
        try:
            _driver.close()
            logger.info("Neo4j driver closed")
        except Exception as e:
            logger.error(f"Error closing Neo4j driver: {str(e)}")
        finally:
            _driver = None


def get_db_session() -> Session:
    """
    Get a new Neo4j session.
    Use with context manager: with get_db_session() as session:
    """
    driver = get_driver()
    return driver.session()


async def verify_neo4j_connection() -> bool:
    """
    Verify Neo4j connection is working.
    """
    try:
        driver = get_driver()

        with driver.session() as session:
            result = session.run("RETURN 1 AS test")
            record = result.single()

            if record and record["test"] == 1:
                logger.info("Neo4j connection verified")
                return True

    except Exception as e:
        logger.error(f"Neo4j connection verification failed: {str(e)}")
        return False

    return False