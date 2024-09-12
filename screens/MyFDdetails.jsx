import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const MyFDdetails = () => {
  const route = useRoute();
  const { userid } = route.params;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfFilePath, setPdfFilePath] = useState(null); // Track PDF file path

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://appadmin.anacreditsolutionpoint.com/download.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `userid=${userid}`,
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }

        const responseText = await response.text();
        console.log('Fetched data:', responseText); // Log to inspect the data

        setData(responseText);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userid]);

  const handleDownloadPDF = async () => {
    try {
      if (!data) {
        throw new Error('No data available to download');
      }

      // Create PDF file
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
          ${data}
        </body>
        </html>
      `;

      // Generate PDF file
      const { filePath } = await RNHTMLtoPDF.convert({
        html: htmlContent,
        fileName: 'MyFDdetails',
        directory: Platform.OS === 'android' ? 'Download' : '', // Use 'Download' directory on Android
      });

      console.log('PDF generated:', filePath);
      setPdfFilePath(filePath); // Store the PDF file path

    } catch (error) {
      console.error('Error generating PDF:', error);
      // Handle error state or show an error message to the user
    }
  };

  const handleSharePDF = async () => {
    try {
      if (!pdfFilePath) {
        throw new Error('PDF file path is not available');
      }

      const shareOptions = {
        url: `file://${pdfFilePath}`,
        type: 'application/pdf',
        title: 'Share PDF',
      };

      await Share.open(shareOptions);

    } catch (error) {
      console.error('Error sharing PDF:', error);
      // Handle error state or show an error message to the user
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.webviewContainer}>
        {data ? (
          <WebView
            originWhitelist={['https://appadmin.anacreditsolutionpoint.com']}
            source={{ html: data }}
            style={styles.webview}
          />
        ) : (
          <Text>No data fetched</Text>
        )}
      </View>
      <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadPDF}>
        <Text style={styles.buttonText}>Download PDF</Text>
      </TouchableOpacity>
      {pdfFilePath && (
        <TouchableOpacity style={styles.shareButton} onPress={handleSharePDF}>
          <Text style={styles.buttonText}>Share PDF</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  downloadButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  shareButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyFDdetails;
