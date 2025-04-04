import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const solrUrl = "http://13.233.83.66:8983/solr/project/select";

    // Define query parameters
    const params = {
      q: "*:*", // Fetch all documents
      rows: 1, // Limit results to 10
      wt: "json", // Response format JSON
    };

    // Send GET request to Solr
    const response = await axios.get(solrUrl, { params });

    // Extract total count and documents
    const { numFound, docs } = response.data.response;

    console.log("Solr Response:", { numFound, docs });

    return NextResponse.json({
      success: true,
      total_count: numFound, // Total number of documents
      data: docs, // First 10 documents
    });
  } catch (error) {
    console.error("Error Fetching Solr Data:", error);
    return NextResponse.json({ success: false, error: "Error fetching data" });
  }
}
