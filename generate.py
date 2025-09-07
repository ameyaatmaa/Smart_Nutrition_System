import pandas as pd
import numpy as np

# Make sure to replace 'user_data.csv' with the actual filename
# of the dataset you downloaded from Kaggle.
user_data_df = pd.read_csv("fitness_dataset.csv")

# Create a new column 'blood_sugar_level'
# Synthesize data based on a normal distribution.
# You can adjust the mean and standard deviation to match a realistic range.
# Here we use 95 mg/dL as the mean with a standard deviation of 15.
# We'll use a random seed for reproducibility.
np.random.seed(42)
blood_sugar_data = np.random.normal(loc=95, scale=15, size=len(user_data_df))

# Ensure values are within a realistic range (e.g., not negative)
blood_sugar_data = np.maximum(blood_sugar_data, 50)

# Add the new column to the DataFrame
user_data_df['blood_sugar_level'] = blood_sugar_data

# Display the first few rows to show the new column
print("Updated user data with 'blood_sugar_level' column:")
print(user_data_df.head())

# Save the updated DataFrame to a new CSV file
output_file = "user_data_with_blood_sugar.csv"
user_data_df.to_csv(output_file, index=False)
print(f"\nUpdated dataset saved to {output_file}")