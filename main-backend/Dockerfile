# Use the official Python image as the base image
FROM python:3.8

# Set the working directory in the container
WORKDIR /app

# Copy the Flask app files to the container
COPY . /app

# Install the Python dependencies
RUN pip install -r requirements.txt

# Expose port 5000 for the Flask app
EXPOSE 5000

# Start the Flask app
CMD ["python", "app.py"]