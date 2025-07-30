export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Senha deve ter pelo menos 8 caracteres');
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra minúscula');
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra maiúscula');
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Senha deve conter pelo menos um número');
  }
  
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push('Senha deve conter pelo menos um caractere especial');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateUsername(username: string): {
  isValid: boolean;
  error?: string;
} {
  if (username.length < 3) {
    return {
      isValid: false,
      error: 'Nome de usuário deve ter pelo menos 3 caracteres',
    };
  }
  
  if (username.length > 20) {
    return {
      isValid: false,
      error: 'Nome de usuário deve ter no máximo 20 caracteres',
    };
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return {
      isValid: false,
      error: 'Nome de usuário pode conter apenas letras, números e underscore',
    };
  }

  return { isValid: true };
}

export function formatValidationErrors(errors: Record<string, string[]>): string[] {
  const formattedErrors: string[] = [];
  
  Object.values(errors).forEach(fieldErrors => {
    formattedErrors.push(...fieldErrors);
  });
  
  return formattedErrors;
}
