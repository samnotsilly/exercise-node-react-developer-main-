import React from 'react';
// import data from '../data.json';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import loaderImg from '../assets/ZZ5H.gif';
import { fetchRepoDetails, fetchRepoReadMeDetails } from '../apis/apis';
import { Divider } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
};

function RepoTable(data: any) {
  const [open, setOpen] = React.useState(false);
  const [selectedRepo, setSelectedRepo] = React.useState<any>({});
  const [tableRows, setTableRows] = React.useState([] as any);
  const [filteredTableRows, setFilteredTableRows] = React.useState([] as any);
  const [isFiltered, setIsFiltered] = React.useState(false as boolean);
  const [langOptions, setLangOptions] = React.useState([] as any);
  const [selectedRepoReadMe, setselectedRepoReadMe] = React.useState('');
  const handleClose = () => {
    console.log('check me');
    setOpen(false);
  };
  const headers = [
    { key: 'repository', label: 'Repository' },
    { key: 'description', label: 'Description' },
    { key: 'language', label: 'Language' },
    { key: 'forksCount', label: 'Forks count' },
  ];

  function createData(repoDataArray: { repoData: any[] }) {
    const rows: Array<{
      name: any;
      description: any;
      language: any;
      forksCount: any;
      updated_at: any;
      login: any;
      assignees_url: any;
      full_name: any;
    }> = [];
    repoDataArray.repoData.forEach((repo) =>
      rows.push({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        forksCount: repo.forks_count,
        updated_at: repo.updated_at,
        login: repo.owner.login,
        assignees_url: repo.assignees_url,
        full_name: repo.full_name,
      })
    );
    setLangOptions(
      rows
        .map((item: { language: any }) => item.language)
        .filter(
          (value: any, index: any, self: string | any[]) =>
            self.indexOf(value) === index
        )
    );
    return rows;
  }

  async function openModal(selectedRepo: any) {
    const markDownData = await fetchRepoReadMeDetails(selectedRepo.full_name);
    setselectedRepoReadMe(markDownData);
    setSelectedRepo(selectedRepo);
    setOpen(true);
    return;
  }

  function handleLangChange(e: any) {
    setIsFiltered(true);
    if (e.target.value === 'all') {
      setIsFiltered(false);
    }
    setFilteredTableRows(
      tableRows.filter((row: { language: any }) => {
        return row.language === e.target.value;
      })
    );
  }
  console.log(selectedRepo);

  React.useEffect(() => {
    fetchRepoDetails().then((d) => setTableRows(createData(d.data)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            {headers.map((row) => {
              return (
                <td key={row.key}>
                  {row.label}{' '}
                  {row.key === 'language' ? (
                    <select
                      onChange={(e) => {
                        handleLangChange(e);
                      }}
                    >
                      <option value="all">All</option>
                      {langOptions.map((lang: any, i: number) => {
                        return (
                          <option key={i} value={lang}>
                            {lang}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    ''
                  )}
                </td>
              );
            })}
          </tr>
        </thead>
        {tableRows.length !== 0 ? (
          <tbody>
            {!isFiltered
              ? tableRows.map(
                  (repo: {
                    id?: any;
                    name?: any;
                    description: any;
                    language: any;
                    forksCount: any;
                    repository?: number;
                  }) => {
                    return (
                      <tr key={repo.id}>
                        <td
                          onClick={() => {
                            openModal(repo);
                          }}
                        >
                          {repo.name}
                        </td>
                        <td>{repo.description}</td>
                        <td>{repo.language}</td>
                        <td>{repo.forksCount}</td>
                      </tr>
                    );
                  }
                )
              : filteredTableRows.map(
                  (repo: {
                    id?: any;
                    name?: any;
                    description: any;
                    language: any;
                    forksCount: any;
                    repository?: number;
                  }) => {
                    return (
                      <tr key={repo.id}>
                        <td
                          onClick={() => {
                            openModal(repo);
                          }}
                        >
                          {repo.name}
                        </td>
                        <td>{repo.description}</td>
                        <td>{repo.language}</td>
                        <td>{repo.forksCount}</td>
                      </tr>
                    );
                  }
                )}
          </tbody>
        ) : (
          ''
        )}
      </table>
      {tableRows.length === 0 ? (
        // <div>
        <img src={loaderImg} height={50} width={50} alt="fireSpot" />
      ) : (
        // </div>
        // <Typography sx={loaderStyle}>Loading...</Typography>
        ''
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedRepo.updated_at ? (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {`Recent Commit Date: ${format(
                new Date(selectedRepo.updated_at),
                'dd/mm/yyyy'
              )}`}
            </Typography>
          ) : (
            ''
          )}

          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`Author: ${selectedRepo.login}`}
          </Typography>
          {selectedRepo.description !== null ? (
            <Typography
              id="modal-modal-title"
              sx={{ mt: 2 }}
              variant="h6"
              component="h2"
            >
              {`Message: ${selectedRepo.description}`}
            </Typography>
          ) : (
            <Typography
              id="modal-modal-title"
              sx={{ mt: 2 }}
              variant="h6"
              component="h2"
            >
              {`Message: -`}
            </Typography>
          )}
          <Divider id="modal-modal-description" sx={{ mt: 2 }} />
          {selectedRepoReadMe ? (
            <>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {`readMe.md`}
              </Typography>
              <ReactMarkdown children={selectedRepoReadMe} />
            </>
          ) : (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {`readMe.md not found`}
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default RepoTable;
