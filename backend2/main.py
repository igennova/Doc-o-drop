from flask import Flask, request, jsonify
from transformers import pipeline

# Use a text-generation pipeline to generate text
generator = pipeline("text-generation", model="TroyDoesAI/MermaidStable3B", tokenizer="TroyDoesAI/MermaidStable3B")

@app.route('/generate_flowchart', methods=['POST'])
def generate_flowchart():
    try:
        data = request.json
        prompt = data.get("prompt", "Generate a Mermaid.js flowchart syntax")
        
        # Use the generator to create the Mermaid syntax
        generated_syntax = generator(prompt, max_length=200, num_return_sequences=1)[0]['generated_text']
        
        return jsonify({"mermaid": generated_syntax})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
