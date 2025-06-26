import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, Plus, CreditCard as Edit, Trash2, MessageCircle } from 'lucide-react-native';

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

export default function ContactsScreen() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'Mom',
      relationship: 'Mother',
      phone: '+1 (555) 123-4567',
      isPrimary: true,
    },
    {
      id: '2',
      name: 'Dr. Sarah Wilson',
      relationship: 'Family Doctor',
      phone: '+1 (555) 987-6543',
      isPrimary: false,
    },
    {
      id: '3',
      name: 'John Smith',
      relationship: 'Best Friend',
      phone: '+1 (555) 456-7890',
      isPrimary: false,
    },
  ]);

  const handleCall = (contact: EmergencyContact) => {
    Alert.alert(
      'Call Contact',
      `Calling ${contact.name} at ${contact.phone}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log(`Calling ${contact.phone}`) },
      ]
    );
  };

  const handleMessage = (contact: EmergencyContact) => {
    Alert.alert(
      'Send Message',
      `Send emergency message to ${contact.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send', onPress: () => console.log(`Messaging ${contact.phone}`) },
      ]
    );
  };

  const handleAddContact = () => {
    Alert.alert('Add Contact', 'Add new emergency contact feature coming soon!');
  };

  const handleEditContact = (contact: EmergencyContact) => {
    Alert.alert('Edit Contact', `Edit ${contact.name} feature coming soon!`);
  };

  const handleDeleteContact = (contact: EmergencyContact) => {
    Alert.alert(
      'Delete Contact',
      `Are you sure you want to remove ${contact.name} from emergency contacts?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setContacts(contacts.filter(c => c.id !== contact.id));
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Emergency Contacts</Text>
        <Text style={styles.subtitle}>
          Manage your trusted contacts for emergency situations
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contactsContainer}>
          {contacts.map((contact) => (
            <View key={contact.id} style={styles.contactCard}>
              <View style={styles.contactInfo}>
                <View style={styles.contactHeader}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  {contact.isPrimary && (
                    <View style={styles.primaryBadge}>
                      <Text style={styles.primaryBadgeText}>PRIMARY</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.contactRelationship}>{contact.relationship}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
              </View>
              
              <View style={styles.contactActions}>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.callButton]}
                  onPress={() => handleCall(contact)}>
                  <Phone size={20} color="#FFFFFF" strokeWidth={2} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, styles.messageButton]}
                  onPress={() => handleMessage(contact)}>
                  <MessageCircle size={20} color="#FFFFFF" strokeWidth={2} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, styles.editButton]}
                  onPress={() => handleEditContact(contact)}>
                  <Edit size={18} color="#6B7280" strokeWidth={2} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDeleteContact(contact)}>
                  <Trash2 size={18} color="#EF4444" strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
          <Plus size={24} color="#FFFFFF" strokeWidth={2} />
          <Text style={styles.addButtonText}>Add Emergency Contact</Text>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>How Emergency Contacts Work</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>1</Text>
            <Text style={styles.infoText}>
              Primary contacts are notified first during emergencies
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>2</Text>
            <Text style={styles.infoText}>
              All contacts receive your location when SOS is activated
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>3</Text>
            <Text style={styles.infoText}>
              Quick call and message options available 24/7
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  contactsContainer: {
    paddingHorizontal: 24,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contactInfo: {
    marginBottom: 16,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    flex: 1,
  },
  primaryBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  primaryBadgeText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  contactRelationship: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
  },
  contactActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: '#059669',
  },
  messageButton: {
    backgroundColor: '#3B82F6',
  },
  editButton: {
    backgroundColor: '#F3F4F6',
  },
  deleteButton: {
    backgroundColor: 'transparent',
  },
  addButton: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 24,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  infoContainer: {
    margin: 24,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E40AF',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoNumber: {
    width: 24,
    height: 24,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E40AF',
    lineHeight: 20,
  },
});