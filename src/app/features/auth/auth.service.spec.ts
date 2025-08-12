import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse } from './auth.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully and store token', () => {
    const mockCredentials: LoginRequest = {
      username: 'testuser',
      password: 'testpass'
    };

    const mockResponse: LoginResponse = {
      access_token: 'mock-token',
      token_type: 'Bearer',
      expires_in: 3600,
      user: {
        id: 1,
        username: 'testuser',
        email: 'test@test.com',
        role: 'user'
      }
    };

    service.login(mockCredentials).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(localStorage.getItem('access_token')).toBe('mock-token');
      expect(localStorage.getItem('user')).toBe(JSON.stringify(mockResponse.user));
      
      // Verificar que los signals se actualizaron
      expect(service.currentUser()).toEqual(mockResponse.user);
      expect(service.token()).toBe('mock-token');
      expect(service.isAuthenticated()).toBeTrue();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCredentials);
    req.flush(mockResponse);
  });

  it('should logout and clear stored data', () => {
    // Setup initial state
    localStorage.setItem('access_token', 'test-token');
    localStorage.setItem('user', JSON.stringify({ id: 1, username: 'test' }));
    
    // Refrescar el estado del servicio
    service.refreshAuthState();

    service.logout();

    expect(localStorage.getItem('access_token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    expect(service.currentUser()).toBeNull();
    expect(service.token()).toBeNull();
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should check authentication status', () => {
    expect(service.isAuthenticated()).toBeFalse();

    localStorage.setItem('access_token', 'test-token');
    localStorage.setItem('user', JSON.stringify({ id: 1, username: 'test' }));
    service.refreshAuthState();

    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should get current user', () => {
    const mockUser = { id: 1, username: 'test', email: 'test@test.com', role: 'user' };
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('access_token', 'test-token');
    
    service.refreshAuthState();

    expect(service.getCurrentUser()).toEqual(mockUser);
    expect(service.currentUser()).toEqual(mockUser);
  });

  it('should get stored token', () => {
    localStorage.setItem('access_token', 'test-token');
    service.refreshAuthState();
    
    expect(service.getToken()).toBe('test-token');
    expect(service.token()).toBe('test-token');
  });

  it('should load stored user on initialization', () => {
    const mockUser = { id: 1, username: 'test', email: 'test@test.com', role: 'user' };
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('access_token', 'test-token');

    // Create new service instance to trigger loadStoredUser
    const newService = TestBed.inject(AuthService);
    
    expect(newService.currentUser()).toEqual(mockUser);
    expect(newService.token()).toBe('test-token');
    expect(newService.isAuthenticated()).toBeTrue();
  });

  it('should update authentication state when token changes', () => {
    // Simular login
    const mockUser = { id: 1, username: 'test', email: 'test@test.com', role: 'user' };
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('access_token', 'test-token');
    
    service.refreshAuthState();
    expect(service.isAuthenticated()).toBeTrue();

    // Simular logout
    service.logout();
    expect(service.isAuthenticated()).toBeFalse();
  });
});
