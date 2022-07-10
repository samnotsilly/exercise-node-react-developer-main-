import { Router, Request, Response } from 'express';
import {
  getAllRepoDetailsFromRemoteUrl,
  getAllRepoDetailsFromFile,
} from '../services/repoDetails.services';

export const repos = Router();

repos.get('/', async (req: Request, res: Response) => {
  let repoData;
  const repoDataFromRemoteURL = await getAllRepoDetailsFromRemoteUrl(req, res);
  const repoDataFromFile = await getAllRepoDetailsFromFile(req, res);
  if (
    repoDataFromFile &&
    repoDataFromFile.length !== 0 &&
    repoDataFromRemoteURL &&
    repoDataFromRemoteURL.length !== 0
  ) {
    const mergedArray = [...repoDataFromRemoteURL, ...repoDataFromFile];
    repoData = mergedArray.filter(function (repo) {
      return repo.fork === false;
    });
  } else if (repoDataFromFile && repoDataFromFile.length !== 0) {
    repoDataFromFile.filter(function (repo: { fork: boolean }) {
      return repo.fork === false;
    });
    repoData = repoDataFromRemoteURL;
  } else if (repoDataFromRemoteURL.length !== 0) {
    repoDataFromRemoteURL.filter(function (repo: { fork: boolean }) {
      return repo.fork !== false;
    });
    repoData = repoDataFromFile;
  }
  res.json({ repoData });
  res.status(200);
});
