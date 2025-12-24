/**
 * MurimDiscipleBot - GNOME Shell Extension
 * Displays Murim-style self-care messages in the top panel
 * Compatible with GNOME Shell 45+
 */

import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import St from 'gi://St';
import Clutter from 'gi://Clutter';

import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';

export default class MurimDiscipleBotExtension extends Extension {
    enable() {
        this._messages = [];
        this._lastIndex = -1;
        this._typingTimeoutId = null;
        this._timerSourceId = null;

        // Load settings
        this._settings = this.getSettings();

        // Create panel button
        this._indicator = new PanelMenu.Button(0.0, this.metadata.name, false);

        // Create label for messages
        this._label = new St.Label({
            text: '',
            y_align: Clutter.ActorAlign.CENTER,
        });
        this._indicator.add_child(this._label);

        // Get position from settings and add to panel
        const position = this._settings.get_string('panel-position');
        Main.panel.addToStatusArea(this.uuid, this._indicator, 1, position);

        // Load messages from JSON file
        this._loadMessages();

        // Display first message
        this._setRandomMessage();

        // Set up timer for automatic message rotation
        this._setupTimer();

        // Connect click handler for manual refresh
        this._clickHandlerId = this._indicator.connect('button-press-event', () => {
            this._setRandomMessage();
            return Clutter.EVENT_STOP;
        });

        // Watch for settings changes
        this._settingsChangedId = this._settings.connect('changed', (settings, key) => {
            if (key === 'panel-position') {
                this._updatePosition();
            } else if (key === 'message-interval') {
                this._setupTimer();
            }
        });
    }

    _setupTimer() {
        // Clear existing timer
        if (this._timerSourceId !== null) {
            GLib.source_remove(this._timerSourceId);
            this._timerSourceId = null;
        }

        const interval = this._settings.get_int('message-interval');
        this._timerSourceId = GLib.timeout_add_seconds(
            GLib.PRIORITY_DEFAULT,
            interval,
            () => {
                this._setRandomMessage();
                return GLib.SOURCE_CONTINUE;
            }
        );
    }

    _updatePosition() {
        // Remove and re-add indicator at new position
        if (this._indicator) {
            const position = this._settings.get_string('panel-position');

            // Get current parent and remove
            const parent = this._indicator.get_parent();
            if (parent) {
                parent.remove_child(this._indicator);
            }

            // Add to new position
            Main.panel.addToStatusArea(this.uuid, this._indicator, 1, position);
        }
    }

    _loadMessages() {
        try {
            const file = Gio.File.new_for_path(`${this.path}/messages.json`);
            const [ok, contents] = file.load_contents(null);

            if (ok) {
                const decoder = new TextDecoder('utf-8');
                const json = decoder.decode(contents);
                this._messages = JSON.parse(json);

                if (!Array.isArray(this._messages) || this._messages.length === 0) {
                    this._messages = ['Tidak ada pesan!'];
                }
            }
        } catch (error) {
            console.error(`[MurimDiscipleBot] Error loading messages: ${error.message}`);
            this._messages = ['Error memuat pesan!'];
        }
    }

    _clearTypingTimeout() {
        if (this._typingTimeoutId !== null) {
            GLib.source_remove(this._typingTimeoutId);
            this._typingTimeoutId = null;
        }
    }

    _setRandomMessage() {
        // Clear any existing typing animation
        this._clearTypingTimeout();

        // Select random message (avoid repeating last message)
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this._messages.length);
        } while (newIndex === this._lastIndex && this._messages.length > 1);

        this._lastIndex = newIndex;
        const message = this._messages[newIndex] ?? '';

        // Clear label and start typing animation
        this._label.set_text('');
        this._typeMessage(message, 0);
    }

    _typeMessage(message, charIndex) {
        if (charIndex >= message.length) {
            this._typingTimeoutId = null;
            return;
        }

        // Update label with next character
        this._label.set_text(message.substring(0, charIndex + 1));

        // Get typing speed from settings
        const baseDelay = this._settings.get_int('typing-speed');
        const currentChar = message[charIndex];
        const delay = ' .,!?:;'.includes(currentChar) ? baseDelay * 2 : baseDelay;

        // Schedule next character
        this._typingTimeoutId = GLib.timeout_add(
            GLib.PRIORITY_DEFAULT,
            delay,
            () => {
                this._typeMessage(message, charIndex + 1);
                return GLib.SOURCE_REMOVE;
            }
        );
    }

    disable() {
        // Disconnect settings handler
        if (this._settingsChangedId !== null) {
            this._settings.disconnect(this._settingsChangedId);
            this._settingsChangedId = null;
        }

        // Clean up typing animation
        this._clearTypingTimeout();

        // Clean up timer
        if (this._timerSourceId !== null) {
            GLib.source_remove(this._timerSourceId);
            this._timerSourceId = null;
        }

        // Disconnect click handler and destroy indicator
        if (this._indicator) {
            if (this._clickHandlerId) {
                this._indicator.disconnect(this._clickHandlerId);
                this._clickHandlerId = null;
            }
            this._indicator.destroy();
            this._indicator = null;
        }

        this._label = null;
        this._messages = null;
        this._settings = null;
    }
}
