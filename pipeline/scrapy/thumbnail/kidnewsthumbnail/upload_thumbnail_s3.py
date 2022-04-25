from kidnews_thumbnail import get_records, upload_s3


if __name__ == "__main__":
    records = get_records()
    upload_s3(records)
