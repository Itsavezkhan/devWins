"use client";
import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchRepoDetails } from '@/redux/repo/repoThunks';
import { RootState } from '@/redux/store';
import GitHubStats from './githubStats';
import Loading from './loading';

const Page = ({
  params,
}: {
  params: Promise<{ repoName: string }>;
})  => {
  const dispatch = useDispatch();
 const { repoDetails, loading, error } = useSelector((state: RootState) => state.repos);
  const { user, loading: userLoading, error: userError } = useSelector((state: RootState) => state.users);
    const insight = useSelector((state: any) => state.insights.repoInsight);
 

  const { username, githubAccessToken, owner } = user || {};
   const resolvedParams = React.use(params);
  const { repoName } = resolvedParams;

  // Fetch repo details
  useEffect(() => {
    console.log("oahh")
       console.log(githubAccessToken)
          console.log(username)
             console.log(repoName)
    if (username && githubAccessToken && repoName) {
      dispatch(fetchRepoDetails({ owner: username, repo: repoName, token: githubAccessToken }));
    }
  }, [dispatch, username, githubAccessToken, repoName]);

  // Show loading while fetching
  if (loading) return <Loading />;

  // Show error if fetching failed
  if (error) {
    return (
      <div className="text-red-500 text-lg">
        Repo details could not be fetched at the moment. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <p className='text-xl font-semibold'>{repoName}</p>
      <p className='text-lg'>Owner: {username}</p>
      <GitHubStats  />
    </div>
  );
};

export default Page;

