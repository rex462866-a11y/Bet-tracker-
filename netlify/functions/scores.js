exports.handler = async function (event) {
  const { date, key } = event.queryStringParameters || {};

  if (!date || !key) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing 'date' or 'key' query parameter." }),
    };
  }

  try {
    const resp = await fetch(`https://v3.football.api-sports.io/fixtures?date=${encodeURIComponent(date)}`, {
      headers: { "x-apisports-key": key },
    });

    const data = await resp.json();

    return {
      statusCode: resp.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
