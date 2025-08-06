package database

import (
	"fmt"
	"log"
	"os"
	"time"

	"family-budget-server/internal/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

// Connect establishes database connection
func Connect() error {
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	dbname := os.Getenv("DB_NAME")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")

	if host == "" {
		host = "localhost"
	}
	if port == "" {
		port = "3306"
	}
	if dbname == "" {
		dbname = "family_budget"
	}
	if user == "" {
		user = "app_user"
	}
	if password == "" {
		password = "app_password"
	}

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Asia%%2FTokyo",
		user, password, host, port, dbname)

	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
		NowFunc: func() time.Time {
			return time.Now().In(time.FixedZone("Asia/Tokyo", 9*60*60))
		},
	})

	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	sqlDB, err := DB.DB()
	if err != nil {
		return fmt.Errorf("failed to get database instance: %w", err)
	}

	// Connection pool settings
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	log.Println("Database connected successfully")
	return nil
}

// Migrate runs database migrations
func Migrate() error {
	err := DB.AutoMigrate(
		&models.User{},
		&models.Category{},
		&models.Transaction{},
		&models.Budget{},
	)
	if err != nil {
		return fmt.Errorf("failed to migrate database: %w", err)
	}

	log.Println("Database migration completed successfully")
	return nil
}

// SeedData inserts initial data if tables are empty
func SeedData() error {
	// Check if categories exist
	var categoryCount int64
	DB.Model(&models.Category{}).Count(&categoryCount)

	if categoryCount == 0 {
		categories := []models.Category{
			{Name: "食費", Type: "expense", Color: "#EF4444", Description: "食料品・外食費"},
			{Name: "交通費", Type: "expense", Color: "#F97316", Description: "電車・バス・タクシー代"},
			{Name: "娯楽費", Type: "expense", Color: "#EAB308", Description: "映画・ゲーム・趣味"},
			{Name: "光熱費", Type: "expense", Color: "#22C55E", Description: "電気・ガス・水道代"},
			{Name: "通信費", Type: "expense", Color: "#3B82F6", Description: "携帯・インターネット代"},
			{Name: "医療費", Type: "expense", Color: "#8B5CF6", Description: "病院・薬代"},
			{Name: "給与", Type: "income", Color: "#10B981", Description: "会社からの給与"},
			{Name: "副収入", Type: "income", Color: "#06B6D4", Description: "副業・その他収入"},
		}

		result := DB.Create(&categories)
		if result.Error != nil {
			return fmt.Errorf("failed to seed categories: %w", result.Error)
		}
		log.Println("Initial categories seeded successfully")
	}

	return nil
}