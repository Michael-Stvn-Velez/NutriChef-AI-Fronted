import type { User } from '../entities/User'
import type {
  ForgotPasswordRequest,
  LoginRequest,
  RefreshTokenRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from '../Request/AuthRequest'
import type {
  ForgotPasswordResponse,
  LoginResult,
  RefreshTokenResponse,
  ResetPasswordResponse,
} from '../Response/AuthResponse'

export interface IAuthRepository {
  register(request: RegisterRequest): Promise<User>
  login(request: LoginRequest): Promise<LoginResult>
  refreshToken(request: RefreshTokenRequest): Promise<RefreshTokenResponse>
  forgotPassword(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse>
  resetPassword(request: ResetPasswordRequest): Promise<ResetPasswordResponse>
}
