package model

type Note struct {
	Base
	Content string `gorm:"not null;" json:"content"`
	Tags    string `json:"tags"`
	UserId  uint   `gorm:"not null;" json:"user_id"`
	User    User   `gorm:"foreignKey:UserId" json:"-"`
}
