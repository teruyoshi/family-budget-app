package models

import (
	"time"

	"gorm.io/gorm"
)

// User represents a user in the system
type User struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	Name      string         `gorm:"size:100;not null" json:"name"`
	Email     string         `gorm:"size:100;uniqueIndex;not null" json:"email"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	// Relations
	Transactions []Transaction `gorm:"foreignKey:UserID" json:"transactions,omitempty"`
	Budgets      []Budget      `gorm:"foreignKey:UserID" json:"budgets,omitempty"`
}

// Category represents expense/income categories
type Category struct {
	ID          uint           `gorm:"primaryKey" json:"id"`
	Name        string         `gorm:"size:50;not null" json:"name"`
	Type        string         `gorm:"size:10;not null;check:type IN ('income', 'expense')" json:"type"`
	Color       string         `gorm:"size:7;default:'#6B7280'" json:"color"`
	Description string         `gorm:"size:200" json:"description"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`

	// Relations
	Transactions []Transaction `gorm:"foreignKey:CategoryID" json:"transactions,omitempty"`
	Budgets      []Budget      `gorm:"foreignKey:CategoryID" json:"budgets,omitempty"`
}

// Transaction represents income/expense transactions
type Transaction struct {
	ID          uint           `gorm:"primaryKey" json:"id"`
	UserID      uint           `gorm:"not null;index" json:"user_id"`
	CategoryID  uint           `gorm:"not null;index" json:"category_id"`
	Amount      int64          `gorm:"not null" json:"amount"` // 円単位で保存
	Description string         `gorm:"size:200" json:"description"`
	Date        time.Time      `gorm:"not null" json:"date"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`

	// Relations
	User     User     `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Category Category `gorm:"foreignKey:CategoryID" json:"category,omitempty"`
}

// Budget represents monthly budget for categories
type Budget struct {
	ID         uint           `gorm:"primaryKey" json:"id"`
	UserID     uint           `gorm:"not null;index" json:"user_id"`
	CategoryID uint           `gorm:"not null;index" json:"category_id"`
	Amount     int64          `gorm:"not null" json:"amount"` // 円単位で保存
	Month      time.Time      `gorm:"not null;index" json:"month"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`

	// Relations
	User     User     `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Category Category `gorm:"foreignKey:CategoryID" json:"category,omitempty"`
}