export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    try {
      // Placeholder for integration with SendGrid, Nodemailer, etc.
      console.log("Sending inquiry to info@incluu.us", { name, email, message });
      res.status(200).json({ message: 'Inquiry sent successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send inquiry' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
