// File: src/backend/routes/contacts.js
import express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const DATA_FILE = join(__dirname, '../data/contacts.json');

// Helper: Read contacts from JSON file
function readContacts() {
  try {
    const data = readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

// Helper: Write contacts to JSON file
function writeContacts(contacts) {
  writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));
}

// Audit logging
function logAction(action, contactId, status = 'success') {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] | ${action} | ContactID: ${contactId} | Status: ${status}`);
}

// Validation
function validateContact(data) {
  const errors = [];
  
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Name is required');
  }
  
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }
  
  if (data.phone && !/^[\d\s\-+()]{7,20}$/.test(data.phone)) {
    errors.push('Invalid phone format');
  }
  
  return errors;
}

// GET /api/contacts - List all contacts
router.get('/', (req, res) => {
  try {
    const contacts = readContacts();
    logAction('LIST', 'ALL');
    res.json(contacts);
  } catch (error) {
    logAction('LIST', 'ALL', 'ERROR');
    res.status(500).json({ 
      success: false, 
      message: 'Failed to read contacts' 
    });
  }
});

// GET /api/contacts/:id - Get single contact
router.get('/:id', (req, res) => {
  try {
    const contacts = readContacts();
    const contact = contacts.find(c => c.id === req.params.id);
    
    if (!contact) {
      logAction('GET', req.params.id, 'NOT_FOUND');
      return res.status(404).json({ 
        success: false, 
        message: 'Contact not found' 
      });
    }
    
    logAction('GET', req.params.id);
    res.json(contact);
  } catch (error) {
    logAction('GET', req.params.id, 'ERROR');
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get contact' 
    });
  }
});

// POST /api/contacts - Create new contact
router.post('/', (req, res) => {
  try {
    const { name, email, phone, company, category } = req.body;
    
    // Validation
    const errors = validateContact(req.body);
    if (errors.length > 0) {
      logAction('CREATE', 'NEW', 'VALIDATION_ERROR');
      return res.status(400).json({ 
        success: false, 
        message: errors.join(', ') 
      });
    }
    
    const contacts = readContacts();
    const newContact = {
      id: uuidv4(),
      name: name.trim(),
      email: email?.trim() || '',
      phone: phone?.trim() || '',
      company: company?.trim() || '',
      category: category || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    contacts.push(newContact);
    writeContacts(contacts);
    
    logAction('CREATE', newContact.id);
    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      contact: newContact
    });
  } catch (error) {
    logAction('CREATE', 'NEW', 'ERROR');
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create contact' 
    });
  }
});

// PUT /api/contacts/:id - Update contact
router.put('/:id', (req, res) => {
  try {
    const contacts = readContacts();
    const index = contacts.findIndex(c => c.id === req.params.id);
    
    if (index === -1) {
      logAction('UPDATE', req.params.id, 'NOT_FOUND');
      return res.status(404).json({ 
        success: false, 
        message: 'Contact not found' 
      });
    }
    
    // Validation
    const errors = validateContact(req.body);
    if (errors.length > 0) {
      logAction('UPDATE', req.params.id, 'VALIDATION_ERROR');
      return res.status(400).json({ 
        success: false, 
        message: errors.join(', ') 
      });
    }
    
    const { name, email, phone, company, category } = req.body;
    
    contacts[index] = {
      ...contacts[index],
      name: name.trim(),
      email: email?.trim() || '',
      phone: phone?.trim() || '',
      company: company?.trim() || '',
      category: category || '',
      updatedAt: new Date().toISOString()
    };
    
    writeContacts(contacts);
    logAction('UPDATE', req.params.id);
    
    res.json({
      success: true,
      message: 'Contact updated successfully',
      contact: contacts[index]
    });
  } catch (error) {
    logAction('UPDATE', req.params.id, 'ERROR');
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update contact' 
    });
  }
});

// DELETE /api/contacts/:id - Delete contact
router.delete('/:id', (req, res) => {
  try {
    const contacts = readContacts();
    const index = contacts.findIndex(c => c.id === req.params.id);
    
    if (index === -1) {
      logAction('DELETE', req.params.id, 'NOT_FOUND');
      return res.status(404).json({ 
        success: false, 
        message: 'Contact not found' 
      });
    }
    
    const deletedContact = contacts.splice(index, 1)[0];
    writeContacts(contacts);
    
    logAction('DELETE', req.params.id);
    res.json({
      success: true,
      message: 'Contact deleted successfully',
      id: deletedContact.id
    });
  } catch (error) {
    logAction('DELETE', req.params.id, 'ERROR');
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete contact' 
    });
  }
});

export default router;