/**
 * Input validation utilities for API tokens and sensitive data
 */

export interface TokenValidationRule {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  allowedPrefixes?: string[];
  forbiddenPatterns?: RegExp[];
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  warnings?: string[];
}

// Token validation rules for different services
export const TOKEN_VALIDATION_RULES: Record<string, TokenValidationRule> = {
  'Paperclip': {
    minLength: 20,
    maxLength: 200,
    pattern: /^[a-zA-Z0-9\-_\.]+$/,
    allowedPrefixes: ['pk_', 'sk_', 'pt_'],
    forbiddenPatterns: [/(.)\1{4,}/], // No 5+ consecutive same characters
  },
  'OpenAI': {
    minLength: 20,
    maxLength: 200,
    pattern: /^sk-[a-zA-Z0-9]{48}$/,
    allowedPrefixes: ['sk-'],
  },
  'Anthropic': {
    minLength: 20,
    maxLength: 200,
    pattern: /^sk-ant-api03-[a-zA-Z0-9\-_]{95}$/,
    allowedPrefixes: ['sk-ant-api03-'],
  },
  'Stripe': {
    minLength: 20,
    maxLength: 200,
    pattern: /^sk_(live|test)_[a-zA-Z0-9]{24}$/,
    allowedPrefixes: ['sk_live_', 'sk_test_'],
  },
  'GitHub': {
    minLength: 20,
    maxLength: 200,
    pattern: /^ghp_[a-zA-Z0-9]{36}$|^gho_[a-zA-Z0-9]{36}$|^ghu_[a-zA-Z0-9]{36}$|^ghs_[a-zA-Z0-9]{36}$|^ghr_[a-zA-Z0-9]{36}$/,
    allowedPrefixes: ['ghp_', 'gho_', 'ghu_', 'ghs_', 'ghr_'],
  },
  'default': {
    minLength: 10,
    maxLength: 500,
    pattern: /^[a-zA-Z0-9\-_\.]+$/,
    forbiddenPatterns: [/(.)\1{4,}/],
  },
};

/**
 * Validate an API token based on service-specific rules
 */
export function validateApiToken(serviceName: string, token: string): ValidationResult {
  const rules = TOKEN_VALIDATION_RULES[serviceName] || TOKEN_VALIDATION_RULES.default;
  const warnings: string[] = [];

  // Basic null/undefined check
  if (!token || typeof token !== 'string') {
    return {
      isValid: false,
      error: 'Token is required and must be a string',
    };
  }

  // Length validation
  if (rules.minLength && token.length < rules.minLength) {
    return {
      isValid: false,
      error: `Token must be at least ${rules.minLength} characters long`,
    };
  }

  if (rules.maxLength && token.length > rules.maxLength) {
    return {
      isValid: false,
      error: `Token must not exceed ${rules.maxLength} characters`,
    };
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(token)) {
    return {
      isValid: false,
      error: `Token format is invalid for ${serviceName}`,
    };
  }

  // Prefix validation
  if (rules.allowedPrefixes && rules.allowedPrefixes.length > 0) {
    const hasValidPrefix = rules.allowedPrefixes.some(prefix => token.startsWith(prefix));
    if (!hasValidPrefix) {
      warnings.push(`Token should start with one of: ${rules.allowedPrefixes.join(', ')}`);
    }
  }

  // Forbidden pattern validation
  if (rules.forbiddenPatterns) {
    for (const forbiddenPattern of rules.forbiddenPatterns) {
      if (forbiddenPattern.test(token)) {
        return {
          isValid: false,
          error: 'Token contains invalid patterns (e.g., repeated characters)',
        };
      }
    }
  }

  // Common security checks
  if (token.toLowerCase().includes('password') || token.toLowerCase().includes('secret')) {
    warnings.push('Token should not contain common words like "password" or "secret"');
  }

  // Check for common test tokens
  const commonTestTokens = [
    'test', 'demo', 'example', 'sample', 'fake', 'mock',
    '1234567890', 'abcdefghij', 'token', 'key'
  ];
  if (commonTestTokens.some(testToken => token.toLowerCase().includes(testToken))) {
    return {
      isValid: false,
      error: 'Token appears to be a test/example token',
    };
  }

  return {
    isValid: true,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

/**
 * Validate service name
 */
export function validateServiceName(serviceName: string): ValidationResult {
  if (!serviceName || typeof serviceName !== 'string') {
    return {
      isValid: false,
      error: 'Service name is required',
    };
  }

  if (serviceName.length < 2 || serviceName.length > 50) {
    return {
      isValid: false,
      error: 'Service name must be between 2 and 50 characters',
    };
  }

  if (!/^[a-zA-Z0-9\-_\s]+$/.test(serviceName)) {
    return {
      isValid: false,
      error: 'Service name can only contain letters, numbers, spaces, hyphens, and underscores',
    };
  }

  return {
    isValid: true,
  };
}

/**
 * Validate deployment request data
 */
export function validateDeploymentRequest(data: {
  templateId: string;
  companyName: string;
  templateData: any;
}): ValidationResult {
  const { templateId, companyName, templateData } = data;

  if (!templateId || typeof templateId !== 'string') {
    return {
      isValid: false,
      error: 'Template ID is required',
    };
  }

  if (!companyName || typeof companyName !== 'string') {
    return {
      isValid: false,
      error: 'Company name is required',
    };
  }

  if (companyName.length < 2 || companyName.length > 100) {
    return {
      isValid: false,
      error: 'Company name must be between 2 and 100 characters',
    };
  }

  if (!templateData || typeof templateData !== 'object') {
    return {
      isValid: false,
      error: 'Template data is required',
    };
  }

  return {
    isValid: true,
  };
}
