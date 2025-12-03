#!/bin/bash

BASE="http://localhost"
API_KEY="super-secret-key-123"

echo "--------------------------------------------------"
echo "1) Health Check"
echo "--------------------------------------------------"
curl -s $BASE/health | jq .
echo -e "\n"

echo "--------------------------------------------------"
echo "2) Get Public Content"
echo "--------------------------------------------------"
curl -s $BASE/api/content | jq .
echo -e "\n"

echo "--------------------------------------------------"
echo "3) Admin: Update Content Snapshot"
echo "--------------------------------------------------"

curl -s -X PUT "$BASE/api/content" \
  -H "X-API-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "hero": {
      "headline": "Updated from curl test",
      "subheadline": "This update comes from test_api.sh",
      "primaryCtaLabel": "Get Started",
      "primaryCtaHref": "/contact"
    },
    "about": {
      "title": "About Us",
      "body": ["Updated via test script"]
    }
  }' | jq .
echo -e "\n"

echo "--------------------------------------------------"
echo "4) Upload Resume (Careers Application)"
echo "--------------------------------------------------"

curl -s -X POST "$BASE/api/careers/apply" \
  -F "full_name=John Test" \
  -F "email=john.test@example.com" \
  -F "phone=555-123-4567" \
  -F "position=Software Engineer" \
  -F "message=This is a test resume upload via curl" \
  -F "resume=@sample_resume.pdf" | jq .
echo -e "\n"

echo "--------------------------------------------------"
echo "5) Upload Public Media Asset"
echo "--------------------------------------------------"

curl -s -X POST "$BASE/api/media/upload" \
  -F "kind=hero_image" \
  -F "is_public=true" \
  -F "file=@sample_image.png" \
  -H "X-API-Key: $API_KEY" | jq .
echo -e "\n"

echo "--------------------------------------------------"
echo "All tests completed."
echo "--------------------------------------------------"