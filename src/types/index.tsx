// src/types/index.ts

export type Platform = 'airbnb' | 'booking_com' | 'expedia' | 'tripadvisor'

export type BookingStatus = 'confirmed' | 'pending' | 'cancelled'

export interface Sender {
  name: string
  avatarUrl?: string
}

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
  status: BookingStatus
  totalAmount: number
  currency: string
}

export interface Message {
  id: string
  platform: Platform
  platformMessageId: string
  subject: string
  body: string
  isRead: boolean
  receivedAt: string
  sender: Sender
  propertyId: string
  bookingId?: string
}

// API response shapes
export interface MessagesResponse {
  data: Message[]
}

export interface MessageDetailResponse {
  message: Message
  property?: Property
  booking?: Booking
}