#!/bin/bash

local_dir="$1"
ssh_shortcut="$2"
remote_path="$3"

rsync -avc --progress ${local_dir} ${ssh_shortcut}:${remote_path}
