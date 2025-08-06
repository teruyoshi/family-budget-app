package handlers

import (
	"net/http"
	"time"

	"family-budget-server/internal/database"

	"github.com/gin-gonic/gin"
)

// HealthResponse represents health check response
type HealthResponse struct {
	Status    string    `json:"status"`
	Timestamp time.Time `json:"timestamp"`
	Database  string    `json:"database"`
	Version   string    `json:"version"`
}

// HealthCheck handles health check endpoint
func HealthCheck(c *gin.Context) {
	response := HealthResponse{
		Status:    "ok",
		Timestamp: time.Now(),
		Version:   "1.0.0",
	}

	// Check database connection
	sqlDB, err := database.DB.DB()
	if err != nil {
		response.Database = "error"
		c.JSON(http.StatusInternalServerError, response)
		return
	}

	if err := sqlDB.Ping(); err != nil {
		response.Database = "disconnected"
		c.JSON(http.StatusInternalServerError, response)
		return
	}

	response.Database = "connected"
	c.JSON(http.StatusOK, response)
}