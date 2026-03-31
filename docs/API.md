# AgentForge API Reference

## Base URL

```
Production: https://api.agentforge.dev
Local: http://localhost:3001
```

## Endpoints

### Health Check

```
GET /health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2026-03-30T00:00:00.000Z",
  "version": "0.1.0"
}
```

### Marketplace

#### List Templates
```
GET /api/marketplace/templates
```

Response:
```json
{
  "templates": [
    {
      "id": "saas-startup",
      "name": "SaaS Startup",
      "description": "Full-stack development team...",
      "price": 299,
      "agents": [...],
      "skills": [...],
      "downloads": 1247,
      "rating": 4.8
    }
  ]
}
```

#### Purchase Template
```
POST /api/marketplace/purchase
```

Body:
```json
{
  "templateId": "saas-startup",
  "paymentMethod": "stripe"
}
```

Response:
```json
{
  "orderId": "uuid",
  "templateId": "saas-startup",
  "status": "processing",
  "downloadUrl": "/download/saas-startup",
  "createdAt": "2026-03-30T00:00:00.000Z"
}
```

### Skills

#### List Skills
```
GET /api/marketplace/skills
```

Response:
```json
{
  "skills": [
    {
      "id": "stripe-integration",
      "name": "Stripe Integration",
      "price": 29,
      "installs": 2341
    }
  ]
}
```

### Companies

#### List Companies
```
GET /api/companies
```

#### Create Company
```
POST /api/companies
```

### Agents

#### List Agents
```
GET /api/agents
```

#### Hire Agent
```
POST /api/agents/hire
```

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |
