import Model, { attr, belongsTo } from '@ember-data/model';

export default class RemoteUrlModel extends Model {
  @attr uri;
  @attr address;
  @attr('datetime') created;
  @attr('datetime') modified;
  @attr downloadStatus;
  @attr creator;

  @belongsTo('file', {
    async: true,
    inverse: null,
  })
  download;

  get downloadSuccess() {
    return (
      this.downloadStatus ===
      'http://lblod.data.gift/file-download-statuses/success'
    );
  }

  get downloadOngoing() {
    const ongoingStatuses = [
      'http://lblod.data.gift/file-download-statuses/ongoing',
      'http://lblod.data.gift/file-download-statuses/ready-to-be-cached',
    ];
    return ongoingStatuses.includes(this.downloadStatus);
  }

  get downloadFailed() {
    return (
      this.downloadStatus ===
      'http://lblod.data.gift/file-download-statuses/failure'
    );
  }

  get downloadLink() {
    return `/files/${this.id}/download`;
  }
}
