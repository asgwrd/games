import os

# Define the script tag to be added
SCRIPT_TAG = '<script async data-id="101479244" src="/055fd9e41d00ec.js"></script>'

def append_script_to_html(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                
                # Read the file content
                with open(file_path, 'r+', encoding='utf-8') as f:
                    content = f.read()
                    
                    # Check if script tag already exists to avoid duplication
                    if SCRIPT_TAG not in content:
                        f.write('\n' + SCRIPT_TAG)  # Append script at the end
                        print(f"Updated: {file_path}")
                    else:
                        print(f"Skipped (already updated): {file_path}")

# Run the function on the current directory
append_script_to_html(".")
