package model

type Base struct {
	ID        uint       `gorm:"column:id; primaryKey; AUTO_INCREMENT; not null" json:"id"`
	CreatedAt *LocalTime `gorm:"column:created_at;" json:"created_at"`
	UpdatedAt *LocalTime `gorm:"column:updated_at;" json:"updated_at"`
}
