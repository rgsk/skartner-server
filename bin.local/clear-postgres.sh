
# Get the directory of the current script
dir="$(dirname "$0")"

# Run the second script using its relative path from the current script's directory
sh "$dir/remove-postgres.sh"


docker volume rm skartner-server-postgres-data
