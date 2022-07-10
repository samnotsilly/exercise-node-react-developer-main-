import repoDataFromFile from '../../data/repos.json';
import axios from 'axios';
import { Request, Response } from 'express';

export const getAllRepoDetailsFromFile = async (
  req: Request,
  res: Response
) => {
  try {
    if (repoDataFromFile !== null && repoDataFromFile.length !== 0) {
      return repoDataFromFile;
    } else {
      return [];
    }
  } catch (error) {
    res.json({ error });
    res.status(500);
  }
};

export const getAllRepoDetailsFromRemoteUrl = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await axios
      .get('https://api.github.com/users/silverorange/repos')
      .then(function (response: { [x: string]: any } | null) {
        // handle success
        if (response !== null && response.data) {
          return response.data;
        } else {
          return [];
        }
      })
      .catch(function (error: any) {
        return [];
      });
    return data;
  } catch (error) {
    res.json({ error });
    res.status(500);
  }
};
