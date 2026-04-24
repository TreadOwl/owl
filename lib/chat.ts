'use server'

import { supabase } from './supabase'

export async function sendMessage(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const website = formData.get('website') as string
  const message = formData.get('message') as string
  const botField = formData.get('bot-field') as string

  if (botField) return { error: 'Spam detected' }

  if (!name || !message) {
    return { error: 'Missing required fields' }
  }

  const { error } = await supabase.from('messages').insert([{ name, email, website, message }])

  if (error) {
    console.error(error)
    return { error: 'Database error' }
  }

  return { success: true }
}

export async function ChatWall() {
  const { data: messages, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return messages
}
