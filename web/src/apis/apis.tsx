import axios from 'axios';

export const fetchRepoDetails = async () =>
  axios
    .get(`http://localhost:4000/repos`, {
      timeout: 10000,
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      },
    })
    .then((data) => {
      return data;
    });

export const fetchRepoReadMeDetails = async (repoFullName: any) =>
  axios
    .get(`https://raw.githubusercontent.com/${repoFullName}/master/README.md`, {
      timeout: 10000,
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return '';
    });
