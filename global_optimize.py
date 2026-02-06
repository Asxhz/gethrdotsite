import os
import re

def optimize_code(content, ext):
    if ext in ['.js', '.jsx']:
        # 1. Remove all comments (again, just to be sure)
        content = re.sub(r'(?<![:])//.*', '', content)
        content = re.sub(r'/\*[\s\S]*?\*/', '', content)
        
        # 2. Standardize imports: Put React/Libraries first, then components, then styles
        lines = content.split('\n')
        imports = [line for line in lines if line.strip().startswith('import ')]
        other_code = [line for line in lines if not line.strip().startswith('import ')]
        
        # Simple sorting: shorter imports first (usually libraries)
        lib_imports = sorted([i for i in imports if not i.split("'")[1].startswith('.') and not i.split('"')[1].startswith('.')])
        comp_imports = sorted([i for i in imports if i.split("'")[1].startswith('.') or i.split('"')[1].startswith('.')])
        
        new_imports = lib_imports + comp_imports
        if new_imports:
            content = '\n'.join(new_imports) + '\n\n' + '\n'.join(other_code)
        
        # 3. Clean up whitespace
        content = re.sub(r'\n\s*\n', '\n\n', content)
        content = content.replace('\t', '  ')
        
    return content.strip() + '\n'

def process_directory(base_dir):
    for root, _, files in os.walk(base_dir):
        if 'node_modules' in root or '.git' in root or 'dist' in root:
            continue
        for file in files:
            ext = os.path.splitext(file)[1]
            if ext in ['.js', '.jsx', '.css', '.html', '.json']:
                filepath = os.path.join(root, file)
                with open(filepath, 'r') as f:
                    content = f.read()
                
                new_content = optimize_code(content, ext)
                
                with open(filepath, 'w') as f:
                    f.write(new_content)

if __name__ == '__main__':
    base_path = '/Users/ashmitsethi/Desktop/BetterGethr/gethr'
    process_directory(base_path)
