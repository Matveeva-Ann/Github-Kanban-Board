const issuesApi = async (urlParams: Array<string>) => {
  const response = await fetch(`https://api.github.com/repos/${urlParams[0]}/${urlParams[1]}/issues`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export default issuesApi;
