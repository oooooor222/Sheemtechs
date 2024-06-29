from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# Connect to the database (replace with your database details)
conn = sqlite3.connect('auth_codes.db')
cursor = conn.cursor()

# Create the table if it doesn't exist
cursor.execute('''CREATE TABLE IF NOT EXISTS auth_codes
             (code TEXT PRIMARY KEY, used BOOLEAN)''')
conn.commit()

@app.route('/auth', methods=['POST'])
def auth_check():
    code = request.form.get('code')
    if code:
        cursor.execute('SELECT used FROM auth_codes WHERE code = ?', (code,))
        result = cursor.fetchone()
        if result and result[0] == 0:  # Code is unused
            cursor.execute('UPDATE auth_codes SET used = 1 WHERE code = ?', (code,))
            conn.commit()
            return jsonify({'success': True})  # Success
        else:
            return jsonify({'error': 'Authorization code already used.'})
    else:
        return jsonify({'error': 'Invalid code.'})

if __name__ == '__main__':
    app.run(debug=True)