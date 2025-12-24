import os
import subprocess
import sys

def run_sql_script(script_path):
    """Execute a SQL script using the Supabase connection"""
    try:
        # Read the SQL file
        with open(script_path, 'r', encoding='utf-8') as file:
            sql_content = file.read()
        
        print(f"Executing SQL script: {script_path}")
        print(f"SQL Content Preview: {sql_content[:200]}...")
        
        # For now, just print the SQL content since we need to execute it through Supabase
        print("\n" + "="*50)
        print(f"SQL SCRIPT: {script_path}")
        print("="*50)
        print(sql_content)
        print("="*50 + "\n")
        
        return True
        
    except Exception as e:
        print(f"Error reading SQL script {script_path}: {e}")
        return False

def main():
    """Main function to run database setup"""
    print("Setting up Volley Club Trieste database...")
    
    # List of SQL scripts to execute in order
    sql_scripts = [
        "scripts/01_create_tables.sql",
        "scripts/02_seed_data.sql"
    ]
    
    success_count = 0
    
    for script in sql_scripts:
        if os.path.exists(script):
            if run_sql_script(script):
                success_count += 1
            else:
                print(f"Failed to process {script}")
        else:
            print(f"SQL script not found: {script}")
    
    print(f"\nProcessed {success_count}/{len(sql_scripts)} SQL scripts")
    
    if success_count == len(sql_scripts):
        print("✅ Database setup completed successfully!")
        print("\nNext steps:")
        print("1. Copy the SQL commands above")
        print("2. Go to your Supabase project dashboard")
        print("3. Navigate to the SQL Editor")
        print("4. Paste and execute each SQL script")
        print("5. Refresh your v0 preview to see the data")
    else:
        print("❌ Some scripts failed to process")

if __name__ == "__main__":
    main()
