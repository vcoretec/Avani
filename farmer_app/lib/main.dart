import 'package:flutter/material.dart';
import 'screens/splash_screen.dart';

void main() {
  runApp(AvaniFarmerApp());
}

class AvaniFarmerApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Avani Farmer',
      theme: ThemeData(
        primarySwatch: Colors.green,
        primaryColor: Colors.green.shade800,
        scaffoldBackgroundColor: Colors.grey.shade50,
        fontFamily: 'Roboto',
        appBarTheme: AppBarTheme(
          elevation: 0,
          centerTitle: true,
        ),
      ),
      debugShowCheckedModeBanner: false,
      home: SplashScreen(),
    );
  }
}
