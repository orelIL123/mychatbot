require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-api-key-here',
});

// Load minds configuration
const mindsPath = path.join(__dirname, 'minds');
if (!fs.existsSync(mindsPath)) {
  fs.mkdirSync(mindsPath, { recursive: true });
}

// Default mind
const DEFAULT_MIND = "אתה עוזר אישי כללי, דבר בעברית בטון נעים, שירותי ומקצועי.";

// Get mind for client
function getMindForClient(clientId) {
  try {
    const mindFilePath = path.join(mindsPath, `${clientId}.json`);
    if (fs.existsSync(mindFilePath)) {
      const mindData = JSON.parse(fs.readFileSync(mindFilePath, 'utf8'));
      return mindData.systemPrompt;
    }
    return DEFAULT_MIND;
  } catch (error) {
    console.error(`Error loading mind for client ${clientId}:`, error);
    return DEFAULT_MIND;
  }
}

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, clientId } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemPrompt = getMindForClient(clientId || 'default');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices[0].message.content;
    
    res.json({ reply });
  } catch (error) {
    console.error('Error processing chat request:', error);
    res.status(500).json({ error: 'Failed to process chat request' });
  }
});

// Mind management endpoints
app.get('/api/minds', (req, res) => {
  try {
    const minds = fs.readdirSync(mindsPath)
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const clientId = file.replace('.json', '');
        const data = JSON.parse(fs.readFileSync(path.join(mindsPath, file), 'utf8'));
        return {
          clientId,
          name: data.name,
          description: data.description
        };
      });
    
    res.json({ minds });
  } catch (error) {
    console.error('Error listing minds:', error);
    res.status(500).json({ error: 'Failed to list minds' });
  }
});

app.post('/api/minds', (req, res) => {
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
      path.join(mindsPath, `${clientId}.json`),
      JSON.stringify(mindData, null, 2)
    );
    
    res.json({ success: true, clientId });
  } catch (error) {
    console.error('Error creating mind:', error);
    res.status(500).json({ error: 'Failed to create mind' });
  }
});

app.put('/api/minds/:clientId', (req, res) => {
  try {
    const { clientId } = req.params;
    const { name, description, systemPrompt } = req.body;
    
    const mindFilePath = path.join(mindsPath, `${clientId}.json`);
    
    if (!fs.existsSync(mindFilePath)) {
      return res.status(404).json({ error: 'Mind not found' });
    }
    
    const existingData = JSON.parse(fs.readFileSync(mindFilePath, 'utf8'));
    
    const updatedData = {
      ...existingData,
      name: name || existingData.name,
      description: description || existingData.description,
      systemPrompt: systemPrompt || existingData.systemPrompt,
      updatedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(mindFilePath, JSON.stringify(updatedData, null, 2));
    
    res.json({ success: true, clientId });
  } catch (error) {
    console.error('Error updating mind:', error);
    res.status(500).json({ error: 'Failed to update mind' });
  }
});

app.delete('/api/minds/:clientId', (req, res) => {
  try {
    const { clientId } = req.params;
    const mindFilePath = path.join(mindsPath, `${clientId}.json`);
    
    if (!fs.existsSync(mindFilePath)) {
      return res.status(404).json({ error: 'Mind not found' });
    }
    
    fs.unlinkSync(mindFilePath);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting mind:', error);
    res.status(500).json({ error: 'Failed to delete mind' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
