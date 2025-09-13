import { NextApiRequest } from 'next'
import { NextApiResponseServerIO, initializeSocket } from '@/lib/socket'

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (!res.socket.server.io) {
    console.log('Initializing Socket.IO server...')
    const io = initializeSocket(res.socket.server)
    res.socket.server.io = io
    console.log('Socket.IO server initialized successfully')
  } else {
    console.log('Socket.IO server already running')
  }

  res.end()
}

export const config = {
  api: {
    bodyParser: false,
  },
}
