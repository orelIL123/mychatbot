import fs from 'fs';
import path from 'path';

// Get minds directory path
const getMindsDir = () => {
  const mindsDir = path.join(process.cwd(), 'data', 'minds');
  
  // Create minds directory if it doesn't exist
  if (!fs.existsSync(mindsDir)) {
    fs.mkdirSync(mindsDir, { recursive: true });
  }
  
  return mindsDir;
};

export default async function handler(req, res) {
  const mindsDir = getMindsDir();
  
  // GET - List all minds
  if (req.method === 'GET') {
    try {
      const minds = fs.readdirSync(mindsDir)
        .filter(file => file.endsWith('.json'))
        .map(file => {
          const clientId = file.replace('.json', '');
          const data = JSON.parse(fs.readFileSync(path.join(mindsDir, file), 'utf8'));
          return {
            clientId,
            name: data.name,
            description: data.description
          };
        });
      
      // Add sample minds if they don't exist in the directory
      const sampleMinds = [
        {
          clientId: 'restaurant',
          name: 'מסעדה איטלקית',
          description: 'מוח מותאם למסעדה איטלקית'
        },
        {
          clientId: 'law_office',
          name: 'משרד עורכי דין',
          description: 'מוח מותאם למשרד עורכי דין'
        },
        {
          clientId: 'clothing_store',
          name: 'חנות בגדים',
          description: 'מוח מותאם לחנות בגדים'
        }
      ];
      
      // Add sample minds that don't already exist in the list
      const existingClientIds = minds.map(mind => mind.clientId);
      const samplesToAdd = sampleMinds.filter(sample => !existingClientIds.includes(sample.clientId));
      
      res.status(200).json({ minds: [...minds, ...samplesToAdd] });
    } catch (error) {
      console.error('Error listing minds:', error);
      res.status(500).json({ error: 'Failed to list minds' });
    }
  }
  
  // POST - Create a new mind
  else if (req.method === 'POST') {
    try {
      const { clientId, name, description, systemPrompt } = req.body;
      
      if (!clientId || !systemPrompt) {
        return res.status(400).json({ error: 'Client ID and system prompt are required' });
      }
      
      const mindData = {
        name: name || clientId,
        description: description || '',
        systemPrompt,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      fs.writeFileSync(
        path.join(mindsDir, `${clientId}.json`),
        JSON.stringify(mindData, null, 2)
      );
      
      res.status(200).json({ success: true, clientId });
    } catch (error) {
      console.error('Error creating mind:', error);
      res.status(500).json({ error: 'Failed to create mind' });
    }
  }
  
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
