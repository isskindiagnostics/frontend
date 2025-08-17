export const parseAPIResponse = async (
  response: Response
): Promise<unknown> => {
  const responseText = await response.text();

  if (!response.ok) {
    // Check if response is HTML (Next.js error page)
    if (
      responseText.trim().startsWith("<!DOCTYPE") ||
      responseText.trim().startsWith("<html")
    ) {
      throw new Error(
        `API route not found or returning HTML error page. Status: ${response.status}`
      );
    }

    try {
      const errorData = JSON.parse(responseText);
      throw new Error(errorData.error || `HTTP ${response.status}`);
    } catch (parseError) {
      throw new Error(`API error: ${responseText} - ${parseError}`);
    }
  }

  try {
    return JSON.parse(responseText);
  } catch (parseError) {
    throw new Error(`Invalid JSON response from API  - ${parseError}`);
  }
};
