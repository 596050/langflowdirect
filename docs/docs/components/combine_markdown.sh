#!/bin/bash

# Define the output file
output_file="combined_output.mdx"

# Clear the output file if it exists
> "$output_file"

# Separator template
separator="<!-- #################################################### -->\n<!-- ### [NAME] ### -->\n<!-- #################################################### -->\n"

# Loop through all markdown files in the current directory excluding the output file
for file in *.mdx; do
  # Exclude the output file from processing
  if [ "$file" != "$output_file" ]; then
    # Check if any markdown files exist
    if [ -e "$file" ]; then
      # Replace [NAME] with the actual file name in the separator
      current_separator="${separator//\[NAME\]/$file}"

      # Debugging output to ensure the correct separator is being created
      echo "Processing file: $file"
      echo "Adding separator: $current_separator"

      # Append the separator and file content to the output file
      echo -e "$current_separator" >> "$output_file"
      cat "$file" >> "$output_file"
      echo -e "\n" >> "$output_file"
    fi
  fi
done

echo "All markdown files have been combined into $output_file."
