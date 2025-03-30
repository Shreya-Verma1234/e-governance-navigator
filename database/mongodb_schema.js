
// MongoDB Schema Definitions for E-Governance Navigator

// Users Collection
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['username', 'password', 'email', 'fullName', 'userType'],
      properties: {
        username: {
          bsonType: 'string',
          description: 'Username must be a string and is required'
        },
        password: {
          bsonType: 'string',
          description: 'Password must be a string and is required'
        },
        email: {
          bsonType: 'string',
          description: 'Email must be a string and is required'
        },
        fullName: {
          bsonType: 'string',
          description: 'Full name must be a string and is required'
        },
        phoneNumber: {
          bsonType: 'string',
          description: 'Phone number must be a string'
        },
        address: {
          bsonType: 'string',
          description: 'Address must be a string'
        },
        userType: {
          enum: ['citizen', 'admin', 'government_official'],
          description: 'User type must be one of the enum values'
        },
        createdAt: {
          bsonType: 'date',
          description: 'Creation timestamp'
        },
        updatedAt: {
          bsonType: 'date',
          description: 'Last update timestamp'
        }
      }
    }
  }
});

// Tax Records Collection
db.createCollection('taxRecords', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'taxType', 'amount', 'taxYear'],
      properties: {
        userId: {
          bsonType: 'objectId',
          description: 'User ID must be an ObjectId and is required'
        },
        taxType: {
          bsonType: 'string',
          description: 'Tax type must be a string and is required'
        },
        amount: {
          bsonType: 'number',
          description: 'Amount must be a number and is required'
        },
        taxYear: {
          bsonType: 'int',
          description: 'Tax year must be an integer and is required'
        },
        paymentStatus: {
          enum: ['pending', 'paid', 'overdue'],
          description: 'Payment status must be one of the enum values'
        },
        paymentDate: {
          bsonType: 'date',
          description: 'Payment date timestamp'
        },
        createdAt: {
          bsonType: 'date',
          description: 'Creation timestamp'
        }
      }
    }
  }
});

// Utility Bills Collection
db.createCollection('utilityBills', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'billType', 'amount', 'billDate', 'dueDate'],
      properties: {
        userId: {
          bsonType: 'objectId',
          description: 'User ID must be an ObjectId and is required'
        },
        billType: {
          enum: ['electricity', 'water', 'gas', 'internet', 'other'],
          description: 'Bill type must be one of the enum values'
        },
        amount: {
          bsonType: 'number',
          description: 'Amount must be a number and is required'
        },
        billDate: {
          bsonType: 'date',
          description: 'Bill date must be a date and is required'
        },
        dueDate: {
          bsonType: 'date',
          description: 'Due date must be a date and is required'
        },
        paymentStatus: {
          enum: ['pending', 'paid', 'overdue'],
          description: 'Payment status must be one of the enum values'
        },
        paymentDate: {
          bsonType: 'date',
          description: 'Payment date timestamp'
        },
        createdAt: {
          bsonType: 'date',
          description: 'Creation timestamp'
        }
      }
    }
  }
});

// FIR Records Collection
db.createCollection('firRecords', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'incidentType', 'incidentDate', 'incidentLocation', 'description'],
      properties: {
        userId: {
          bsonType: 'objectId',
          description: 'User ID must be an ObjectId and is required'
        },
        incidentType: {
          bsonType: 'string',
          description: 'Incident type must be a string and is required'
        },
        incidentDate: {
          bsonType: 'date',
          description: 'Incident date must be a date and is required'
        },
        incidentLocation: {
          bsonType: 'string',
          description: 'Incident location must be a string and is required'
        },
        description: {
          bsonType: 'string',
          description: 'Description must be a string and is required'
        },
        witnesses: {
          bsonType: 'string',
          description: 'Witnesses information as a string'
        },
        status: {
          enum: ['submitted', 'under_investigation', 'closed', 'rejected'],
          description: 'Status must be one of the enum values'
        },
        fileDate: {
          bsonType: 'date',
          description: 'File date timestamp'
        },
        lastUpdated: {
          bsonType: 'date',
          description: 'Last update timestamp'
        }
      }
    }
  }
});

// Personal Records Collection
db.createCollection('personalRecords', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'documentType', 'documentNumber', 'issueDate', 'issuingAuthority'],
      properties: {
        userId: {
          bsonType: 'objectId',
          description: 'User ID must be an ObjectId and is required'
        },
        documentType: {
          enum: ['birth_certificate', 'death_certificate', 'marriage_certificate', 'property_deed', 'passport', 'driving_license', 'other'],
          description: 'Document type must be one of the enum values'
        },
        documentNumber: {
          bsonType: 'string',
          description: 'Document number must be a string and is required'
        },
        issueDate: {
          bsonType: 'date',
          description: 'Issue date must be a date and is required'
        },
        expiryDate: {
          bsonType: 'date',
          description: 'Expiry date as a date'
        },
        issuingAuthority: {
          bsonType: 'string',
          description: 'Issuing authority must be a string and is required'
        },
        documentStatus: {
          enum: ['active', 'expired', 'revoked'],
          description: 'Document status must be one of the enum values'
        },
        createdAt: {
          bsonType: 'date',
          description: 'Creation timestamp'
        }
      }
    }
  }
});

// Legal Documents Collection
db.createCollection('legalDocuments', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'documentTitle', 'documentType', 'filingDate'],
      properties: {
        userId: {
          bsonType: 'objectId',
          description: 'User ID must be an ObjectId and is required'
        },
        caseNumber: {
          bsonType: 'string',
          description: 'Case number as a string'
        },
        documentTitle: {
          bsonType: 'string',
          description: 'Document title must be a string and is required'
        },
        documentType: {
          enum: ['affidavit', 'court_order', 'legal_notice', 'power_of_attorney', 'other'],
          description: 'Document type must be one of the enum values'
        },
        filingDate: {
          bsonType: 'date',
          description: 'Filing date must be a date and is required'
        },
        courtName: {
          bsonType: 'string',
          description: 'Court name as a string'
        },
        status: {
          enum: ['pending', 'approved', 'rejected', 'in_process'],
          description: 'Status must be one of the enum values'
        },
        documentPath: {
          bsonType: 'string',
          description: 'Document file path as a string'
        },
        createdAt: {
          bsonType: 'date',
          description: 'Creation timestamp'
        },
        updatedAt: {
          bsonType: 'date',
          description: 'Last update timestamp'
        }
      }
    }
  }
});

// Payment Transactions Collection
db.createCollection('paymentTransactions', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'relatedId', 'transactionType', 'amount', 'paymentMethod'],
      properties: {
        userId: {
          bsonType: 'objectId',
          description: 'User ID must be an ObjectId and is required'
        },
        relatedId: {
          bsonType: 'objectId',
          description: 'Related document ID must be an ObjectId and is required'
        },
        transactionType: {
          enum: ['tax', 'utility', 'fine', 'fee', 'other'],
          description: 'Transaction type must be one of the enum values'
        },
        amount: {
          bsonType: 'number',
          description: 'Amount must be a number and is required'
        },
        paymentMethod: {
          enum: ['credit_card', 'debit_card', 'net_banking', 'upi', 'wallet', 'other'],
          description: 'Payment method must be one of the enum values'
        },
        transactionStatus: {
          enum: ['initiated', 'completed', 'failed', 'refunded'],
          description: 'Transaction status must be one of the enum values'
        },
        transactionDate: {
          bsonType: 'date',
          description: 'Transaction date timestamp'
        },
        referenceNumber: {
          bsonType: 'string',
          description: 'Reference number as a string'
        }
      }
    }
  }
});

// Notifications Collection
db.createCollection('notifications', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'title', 'message', 'notificationType'],
      properties: {
        userId: {
          bsonType: 'objectId',
          description: 'User ID must be an ObjectId and is required'
        },
        title: {
          bsonType: 'string',
          description: 'Title must be a string and is required'
        },
        message: {
          bsonType: 'string',
          description: 'Message must be a string and is required'
        },
        notificationType: {
          enum: ['alert', 'reminder', 'update', 'payment', 'other'],
          description: 'Notification type must be one of the enum values'
        },
        isRead: {
          bsonType: 'bool',
          description: 'Read status as a boolean'
        },
        createdAt: {
          bsonType: 'date',
          description: 'Creation timestamp'
        }
      }
    }
  }
});

// FAQs Collection
db.createCollection('faqs', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['category', 'question', 'answer'],
      properties: {
        category: {
          bsonType: 'string',
          description: 'Category must be a string and is required'
        },
        question: {
          bsonType: 'string',
          description: 'Question must be a string and is required'
        },
        answer: {
          bsonType: 'string',
          description: 'Answer must be a string and is required'
        },
        isPublished: {
          bsonType: 'bool',
          description: 'Published status as a boolean'
        },
        createdAt: {
          bsonType: 'date',
          description: 'Creation timestamp'
        },
        updatedAt: {
          bsonType: 'date',
          description: 'Last update timestamp'
        }
      }
    }
  }
});

// News and Updates Collection
db.createCollection('newsUpdates', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'content'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'Title must be a string and is required'
        },
        content: {
          bsonType: 'string',
          description: 'Content must be a string and is required'
        },
        imagePath: {
          bsonType: 'string',
          description: 'Image path as a string'
        },
        isPublished: {
          bsonType: 'bool',
          description: 'Published status as a boolean'
        },
        publishedDate: {
          bsonType: 'date',
          description: 'Published date timestamp'
        },
        createdBy: {
          bsonType: 'objectId',
          description: 'Creator user ID as an ObjectId'
        }
      }
    }
  }
});

// Feedback Collection
db.createCollection('feedback', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['serviceType', 'rating'],
      properties: {
        userId: {
          bsonType: 'objectId',
          description: 'User ID as an ObjectId'
        },
        serviceType: {
          bsonType: 'string',
          description: 'Service type must be a string and is required'
        },
        rating: {
          bsonType: 'int',
          minimum: 1,
          maximum: 5,
          description: 'Rating must be an integer between 1 and 5 and is required'
        },
        comments: {
          bsonType: 'string',
          description: 'Comments as a string'
        },
        submittedAt: {
          bsonType: 'date',
          description: 'Submission timestamp'
        }
      }
    }
  }
});

// Property Records Collection
db.createCollection('propertyRecords', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'propertyType', 'address', 'areaSize', 'areaUnit', 'registrationDate', 'marketValue'],
      properties: {
        userId: {
          bsonType: 'objectId',
          description: 'User ID must be an ObjectId and is required'
        },
        propertyType: {
          enum: ['residential', 'commercial', 'agricultural', 'industrial'],
          description: 'Property type must be one of the enum values'
        },
        address: {
          bsonType: 'string',
          description: 'Address must be a string and is required'
        },
        areaSize: {
          bsonType: 'number',
          description: 'Area size must be a number and is required'
        },
        areaUnit: {
          bsonType: 'string',
          description: 'Area unit must be a string and is required'
        },
        registrationDate: {
          bsonType: 'date',
          description: 'Registration date must be a date and is required'
        },
        marketValue: {
          bsonType: 'number',
          description: 'Market value must be a number and is required'
        },
        isMortgaged: {
          bsonType: 'bool',
          description: 'Mortgage status as a boolean'
        },
        createdAt: {
          bsonType: 'date',
          description: 'Creation timestamp'
        },
        updatedAt: {
          bsonType: 'date',
          description: 'Last update timestamp'
        }
      }
    }
  }
});

// Service Requests Collection
db.createCollection('serviceRequests', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'serviceType', 'requestDetails'],
      properties: {
        userId: {
          bsonType: 'objectId',
          description: 'User ID must be an ObjectId and is required'
        },
        serviceType: {
          bsonType: 'string',
          description: 'Service type must be a string and is required'
        },
        requestDetails: {
          bsonType: 'string',
          description: 'Request details must be a string and is required'
        },
        status: {
          enum: ['pending', 'in_progress', 'completed', 'rejected'],
          description: 'Status must be one of the enum values'
        },
        priority: {
          enum: ['low', 'medium', 'high', 'urgent'],
          description: 'Priority must be one of the enum values'
        },
        assignedTo: {
          bsonType: 'objectId',
          description: 'Assigned user ID as an ObjectId'
        },
        requestedDate: {
          bsonType: 'date',
          description: 'Requested date timestamp'
        },
        completedDate: {
          bsonType: 'date',
          description: 'Completed date timestamp'
        }
      }
    }
  }
});

// Create indexes for better query performance
db.users.createIndex({ username: 1 }, { unique: true });
db.users.createIndex({ email: 1 }, { unique: true });
db.taxRecords.createIndex({ userId: 1 });
db.taxRecords.createIndex({ taxYear: 1 });
db.utilityBills.createIndex({ userId: 1 });
db.utilityBills.createIndex({ dueDate: 1 });
db.firRecords.createIndex({ userId: 1 });
db.firRecords.createIndex({ status: 1 });
db.personalRecords.createIndex({ userId: 1 });
db.legalDocuments.createIndex({ userId: 1 });
db.paymentTransactions.createIndex({ userId: 1 });
db.paymentTransactions.createIndex({ transactionDate: 1 });
db.notifications.createIndex({ userId: 1 });
db.notifications.createIndex({ isRead: 1 });
db.faqs.createIndex({ category: 1 });
db.newsUpdates.createIndex({ publishedDate: -1 });
db.serviceRequests.createIndex({ userId: 1 });
db.serviceRequests.createIndex({ assignedTo: 1 });
db.serviceRequests.createIndex({ status: 1 });

// Sample data insertion functions - you would call these separately or use a proper seeding script

function insertSampleUsers() {
  db.users.insertMany([
    {
      username: 'admin',
      password: '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG',
      email: 'admin@egov.com',
      fullName: 'System Administrator',
      userType: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'citizen',
      password: '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG',
      email: 'citizen@example.com',
      fullName: 'Demo Citizen',
      phoneNumber: '9876543210',
      address: '123 Demo Street, Demo City',
      userType: 'citizen',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'official',
      password: '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG',
      email: 'official@egov.com',
      fullName: 'Government Official',
      phoneNumber: '9876543213',
      address: 'Government Complex, Capital City',
      userType: 'government_official',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
}

// Note: In a real application, you would also implement functions for inserting sample data for all collections
// and ensure proper ObjectID references between collections
