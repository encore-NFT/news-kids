from kidnews_thumbnail import get_records, upload_rds, delete_img_dir


if __name__ == "__main__":
    records = get_records()
    upload_rds(records)
    delete_img_dir()