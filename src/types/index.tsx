
// src/types/index.ts

export type Platform = 'airbnb' | 'booking_com' | 'expedia' | 'tripadvisor' 

export interface Property {
  id: string
  name: string
  address: string
  imageUrl: string
}

export interface Booking {
  id: string
  propertyId: string
  guestName: string
  checkIn: string
  checkOut: string
  nights: number
  totalGuests: number
  status: 'confirmed' | 'pending' | 'cancelled'
  totalAmount: number
  currency: string
}

export interface Message {
  id: string
  platform: Platform
  platformMessageId: string
  subject: string
  preview: string
  body: string
  isRead: boolean
  receivedAt: string
  sender: { name: string; avatarUrl?: string }
  propertyId: string
  bookingId?: string
}

// API response shapes
export interface MessagesResponse {
  data: Message[]
  total: number
}

export interface MessageDetailResponse {
  message: Message
  property: Property
  booking?: Booking
}