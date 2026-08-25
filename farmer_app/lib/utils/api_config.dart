import 'package:flutter/foundation.dart';

class ApiConfig {
  static const String baseUrl = kIsWeb ? 'http://localhost:8080/api' : 'http://10.0.2.2:8080/api';
  static const String loginEndpoint = '/auth/farmer/login';
  static const String registerEndpoint = '/auth/farmer/register';
  static const String profileEndpoint = '/auth/farmer/profile';
}
