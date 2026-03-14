
export default async function handler(req, res) {
  let endpoint = req.query?.endpoint;
  if (!endpoint) {
    endpoint = req.url.split('?')[0].split('/').pop();
  }
  
  switch (endpoint) {

    default:
      return res.status(404).json({ error: 'Not found' });
  }
}
