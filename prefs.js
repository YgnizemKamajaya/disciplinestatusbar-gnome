/**
 * MurimDiscipleBot - Preferences Window
 * GNOME Shell Extension Settings UI
 */

import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import GdkPixbuf from 'gi://GdkPixbuf';

import { ExtensionPreferences, gettext as _ } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class MurimDiscipleBotPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings();

        // Create preferences page
        const page = new Adw.PreferencesPage({
            title: _('Settings'),
            icon_name: 'preferences-system-symbolic',
        });
        window.add(page);

        // ===== DONATION GROUP (TOP) =====
        const donationGroup = new Adw.PreferencesGroup();
        page.add(donationGroup);

        // Horizontal box for text and QR
        const donationBox = new Gtk.Box({
            orientation: Gtk.Orientation.HORIZONTAL,
            spacing: 20,
            margin_top: 10,
            margin_bottom: 10,
            margin_start: 10,
            margin_end: 10,
            halign: Gtk.Align.CENTER,
        });

        // Text container
        const textBox = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            spacing: 5,
            valign: Gtk.Align.CENTER,
        });

        // Main text (Indonesian)
        const mainLabel = new Gtk.Label({
            label: 'Terima kasih sudah pakai <b>MurimDiscipleBot</b>!',
            use_markup: true,
            halign: Gtk.Align.START,
        });
        textBox.append(mainLabel);

        // Subtitle (English, italic)
        const subtitleLabel = new Gtk.Label({
            label: '<i>Thank you for using MurimDiscipleBot!</i>',
            use_markup: true,
            halign: Gtk.Align.START,
            css_classes: ['dim-label'],
        });
        textBox.append(subtitleLabel);

        // Donation text
        const donationLabel = new Gtk.Label({
            label: 'Dukung pengembangan — Scan QRIS di samping',
            use_markup: true,
            halign: Gtk.Align.START,
            margin_top: 10,
        });
        textBox.append(donationLabel);

        // QRIS info
        const qrisInfoLabel = new Gtk.Label({
            label: '<small>Pertimbangkan support Developer dengan memberikan donasi!</small>',
            use_markup: true,
            halign: Gtk.Align.START,
            css_classes: ['dim-label'],
        });
        textBox.append(qrisInfoLabel);

        // Credit
        const creditLabel = new Gtk.Label({
            label: '<small>Made by <a href="https://github.com/YgnizemKamajaya">@YgnizemKamajaya</a></small>',
            use_markup: true,
            halign: Gtk.Align.START,
            margin_top: 5,
        });
        textBox.append(creditLabel);

        donationBox.append(textBox);

        // QR Code Image
        try {
            const qrPath = `${this.path}/qris_dana.png`;
            const pixbuf = GdkPixbuf.Pixbuf.new_from_file_at_scale(qrPath, 120, 120, true);
            const qrImage = Gtk.Picture.new_for_pixbuf(pixbuf);
            qrImage.set_size_request(120, 120);
            donationBox.append(qrImage);
        } catch (e) {
            console.error(`[MurimDiscipleBot] Error loading QR: ${e.message}`);
        }

        donationGroup.add(donationBox);

        // ===== APPEARANCE GROUP =====
        const appearanceGroup = new Adw.PreferencesGroup({
            title: _('Tampilan'),
            description: _('Atur tampilan pesan di panel'),
        });
        page.add(appearanceGroup);

        // Panel Position
        const positionRow = new Adw.ComboRow({
            title: _('Posisi Panel'),
            subtitle: _('Lokasi pesan di panel atas'),
        });

        const positionModel = new Gtk.StringList();
        positionModel.append(_('Kiri (Left)'));
        positionModel.append(_('Tengah (Center)'));
        positionModel.append(_('Kanan (Right)'));
        positionRow.set_model(positionModel);

        // Set current value
        const positions = ['left', 'center', 'right'];
        const currentPos = settings.get_string('panel-position');
        positionRow.set_selected(positions.indexOf(currentPos));

        // Connect change handler
        positionRow.connect('notify::selected', () => {
            settings.set_string('panel-position', positions[positionRow.get_selected()]);
        });

        appearanceGroup.add(positionRow);

        // ===== TIMING GROUP =====
        const timingGroup = new Adw.PreferencesGroup({
            title: _('Waktu'),
            description: _('Atur waktu dan animasi pesan'),
        });
        page.add(timingGroup);

        // Message Interval
        const intervalRow = new Adw.SpinRow({
            title: _('Interval Pesan'),
            subtitle: _('Detik antar pergantian pesan otomatis'),
            adjustment: new Gtk.Adjustment({
                lower: 60,
                upper: 3600,
                step_increment: 30,
                page_increment: 60,
                value: settings.get_int('message-interval'),
            }),
        });

        settings.bind(
            'message-interval',
            intervalRow,
            'value',
            Gio.SettingsBindFlags.DEFAULT
        );

        timingGroup.add(intervalRow);

        // Typing Speed
        const speedRow = new Adw.SpinRow({
            title: _('Kecepatan Ketik'),
            subtitle: _('Milidetik per karakter (semakin kecil = semakin cepat)'),
            adjustment: new Gtk.Adjustment({
                lower: 20,
                upper: 200,
                step_increment: 10,
                page_increment: 20,
                value: settings.get_int('typing-speed'),
            }),
        });

        settings.bind(
            'typing-speed',
            speedRow,
            'value',
            Gio.SettingsBindFlags.DEFAULT
        );

        timingGroup.add(speedRow);

        // ===== ABOUT GROUP =====
        const aboutGroup = new Adw.PreferencesGroup({
            title: _('Tentang'),
        });
        page.add(aboutGroup);

        const aboutRow = new Adw.ActionRow({
            title: _('MurimDiscipleBot v1.0'),
            subtitle: _('Pengingat disiplin ala Murim untuk cultivation!'),
        });
        aboutGroup.add(aboutRow);
    }
}
