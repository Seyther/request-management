export default (req, res) => {
  if (req.method === 'POST') {
    console.log('called');
    res.status(201).json({ status: 'success' });
  }
};
