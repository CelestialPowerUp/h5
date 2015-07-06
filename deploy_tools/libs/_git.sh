#!/bin/bash

local_cfg="$1"
git add *.cfg *output.log
git commit -am "auto committed by _git.sh" 
old_commit_id=$(git show ${local_cfg} |head -n 1 |awk '{print $2}')     
old_tag=${local_cfg}"_old" 
git tag  -d ${old_tag} 
git push github_core --delete ${old_tag} 
git tag -a ${old_tag}  ${old_commit_id} -m "set old ${local_cfg}" 
git tag  -d ${local_cfg} 
git push github_core --delete ${local_cfg} 
git tag   ${local_cfg}
