import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:8000';
  late Dio _dio;
  late FlutterSecureStorage _storage;

  ApiService() {
    _storage = const FlutterSecureStorage();
    _dio = Dio(BaseOptions(
      baseUrl: baseUrl,
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 10),
    ));
    _setupInterceptors();
  }

  void _setupInterceptors() {
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final token = await _storage.read(key: 'auth_token');
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
      onError: (error, handler) async {
        if (error.response?.statusCode == 401) {
          await _storage.delete(key: 'auth_token');
        }
        return handler.next(error);
      },
    ));
  }

  Future<Map<String, dynamic>> login(
    String email,
    String password,
  ) async {
    try {
      final response = await _dio.post(
        '/api/v1/auth/login',
        data: {'email': email, 'password': password},
      );
      await _storage.write(
        key: 'auth_token',
        value: response.data['token'],
      );
      return response.data;
    } on DioException catch (e) {
      throw e.response?.data['error'] ?? 'Login failed';
    }
  }

  Future<Map<String, dynamic>> register({
    required String email,
    required String password,
    required String firstName,
    required String lastName,
  }) async {
    try {
      final response = await _dio.post(
        '/api/v1/auth/register',
        data: {
          'email': email,
          'password': password,
          'firstName': firstName,
          'lastName': lastName,
        },
      );
      await _storage.write(
        key: 'auth_token',
        value: response.data['token'],
      );
      return response.data;
    } on DioException catch (e) {
      throw e.response?.data['error'] ?? 'Registration failed';
    }
  }

  Future<Map<String, dynamic>> getCurrentUser() async {
    try {
      final response = await _dio.get('/api/v1/users/me');
      return response.data;
    } on DioException catch (e) {
      throw e.response?.data['error'] ?? 'Failed to fetch user';
    }
  }

  Future<Map<String, dynamic>> sendMessage(
    String userId,
    String message,
  ) async {
    try {
      final response = await _dio.post(
        '/api/v1/chat',
        data: {
          'userId': userId,
          'title': 'Chat',
          'message': message,
          'model': 'gpt-4',
        },
      );
      return response.data;
    } on DioException catch (e) {
      throw e.response?.data['error'] ?? 'Failed to send message';
    }
  }

  Future<void> logout() async {
    await _storage.delete(key: 'auth_token');
  }
}
